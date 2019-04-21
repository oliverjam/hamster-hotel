const html = String.raw;

const home = () => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Hamster Hotel</title>
        <style></style>
      </head>
      <body>
        <h1>Hamster Hotel</h1>
        <form action="/login" method="POST">
          <label for="username">Username</label>
          <input id="username" name="username" />
          <label for="password">password</label>
          <input id="password" name="password" type="password" />
          <button type="submit">Log in</button>
        </form>
      </body>
    </html>
  `;
};

module.exports = home;