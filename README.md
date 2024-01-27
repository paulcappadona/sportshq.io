# sportshq.io
Sports HQ github pages site

# Landing page
https://github.com/tailwindtoolbox/App-Landing-Page

# Development
## Tailwind CSS
Watch for changes in the input.css file and output to the output.css file
`npx tailwindcss -i ./src/input.css -o ./docs/output.css --watch`

## Http Server
There is a docker compose file that will run a simple http server to serve the static files in the docs folder
To start the server `docker-compose up`
To stop the server `docker-compose down`
