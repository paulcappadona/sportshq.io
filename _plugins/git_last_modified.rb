require "shellwords"
require "time"

module Jekyll
  # Sets page.last_modified_at from git history so jekyll-sitemap can emit
  # accurate <lastmod> values. Locale/legal pages are thin stubs whose real
  # content lives in _data/locales.yml, _data/use_cases.yml, or
  # _includes/legal/content/{lang}/{pp,tos}.html — so lastmod is the max of
  # the page's own file and whichever of those it renders.
  class GitLastModifiedGenerator < Generator
    safe true
    priority :low

    LEGAL_DIR_ALIASES = {
      "es-419" => "es",
      "es-MX" => "es",
      "zh-HK" => "zh-Hant",
    }.freeze

    def generate(site)
      @site = site
      @git_date_cache = {}

      site.pages.each do |page|
        dates = [git_date(page.relative_path)]

        if page.data["locale_id"]
          dates << git_date("_data/locales.yml")
          dates << git_date("_data/use_cases.yml") if use_case_page?(page)
        end

        dates << git_date(legal_content_path(page.data["locale_id"], page.data["legal_type"])) if page.data["legal_type"]

        dates.compact!
        page.data["last_modified_at"] = dates.max unless dates.empty?
      end
    end

    private

    def use_case_page?(page)
      page.data.key?("uc_type") || page.relative_path.include?("/use-cases/")
    end

    def legal_content_path(locale_id, legal_type)
      dir = LEGAL_DIR_ALIASES[locale_id] || locale_id || "en"
      dir = "en" unless Dir.exist?(File.join(@site.source, "_includes/legal/content", dir))
      filename = legal_type == "tos" ? "tos.html" : "pp.html"
      "_includes/legal/content/#{dir}/#{filename}"
    end

    def git_date(relative_path)
      return nil unless relative_path

      @git_date_cache.fetch(relative_path) do
        full_path = File.join(@site.source, relative_path)
        date = nil

        if File.exist?(full_path)
          out = `git -C #{@site.source.shellescape} log -1 --format=%cI -- #{relative_path.shellescape} 2>/dev/null`.strip
          date = Time.iso8601(out) unless out.empty?
        end

        @git_date_cache[relative_path] = date
      end
    end
  end
end
