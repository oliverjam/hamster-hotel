const html = String.raw;

const error = ({ status = 500 }) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Not found | Hamster Hotel</title>
        <style></style>
      </head>
      <body>
        <h1>
          ${status} - ${status === 404 ? "page not found" : "server error"}
        </h1>
      </body>
    </html>
  `;
};

module.exports = error;
