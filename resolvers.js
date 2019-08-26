const user = {
  _id: "1",
  name: "Diana",
  email: "diana@cos.ta",
  picture: "https://cloudinary.com/tightasf"
}

module.exports = {
  Query: {
    me: () => user
  }
}