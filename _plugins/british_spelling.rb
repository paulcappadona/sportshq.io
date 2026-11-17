# Canonical site copy (and the English defaults baked into the includes) use US spelling.
# The British-English locales share those defaults, so convert the rendered HTML for them.
# Word-level only: the lookbehind skips URL slugs (…/office-sports-organizer/), CSS classes,
# and identifiers, which are always preceded by "-", "/", "_" or a word character.
module Jekyll
  module BritishSpelling
    LOCALES = %w[en-GB en-AU en-IN en-SG].freeze
    FOOTBALL_LOCALES = %w[en-GB en-IN en-SG].freeze # en-AU keeps "soccer"

    SPELLING = [
      [/(?<![-\/_\w])([Oo])rganiz(e|ed|es|er|ers|ing|ation|ations)\b/, '\1rganis\2'],
      [/(?<![-\/_\w])([Nn])eighborhood/, '\1eighbourhood'],
      [/(?<![-\/_\w])([Cc])entralized/, '\1entralised'],
    ].freeze

    FOOTBALL = [
      [/(?<![-\/_\w])soccer\b/, 'football'],
      [/(?<![-\/_\w])Soccer\b/, 'Football'],
    ].freeze

    def self.convert(html, locale_id)
      out = html.dup
      SPELLING.each { |re, rep| out.gsub!(re, rep) }
      FOOTBALL.each { |re, rep| out.gsub!(re, rep) } if FOOTBALL_LOCALES.include?(locale_id)
      out
    end
  end

  Hooks.register :pages, :post_render do |page|
    locale_id = page.data["locale_id"]
    next unless BritishSpelling::LOCALES.include?(locale_id)
    next unless page.output_ext == ".html"

    page.output = BritishSpelling.convert(page.output, locale_id)
  end
end
