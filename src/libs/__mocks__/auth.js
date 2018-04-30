const currentUser = jest.fn()
currentUser.mockReturnValue({ uid: 123 })

export default {
  currentUser,
}
