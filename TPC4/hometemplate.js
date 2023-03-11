function todoItems(items) {
  return "TODO"
}

function insertTodoItem() {
  return `
    <div class="w3-card-4">
      <div class="w3-container w3-deep-orange">
        <h2>Insert new TODO item</h2>
      </div>
      <form action="/insert" method="POST" class="w3-container w3-padding-16">
        <input type="text" name="item" class="w3-input w3-threequarter" />
        <input type="submit" value="Insert" class="w3-button w3-black w3-quarter" />
      </form>
    </div>
  `;
}

exports.home = function ({ items }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Home</title>
      <link href="/w3.css" rel="stylesheet"/>
    </head>
    <body class="w3-container">
      <h1>TODO list</h1>

      ${insertTodoItem()}
      ${todoItems(items)}
    </body>
  </html>
  `;
}