import { createSelector } from 'reselect'

export const selectCurrentUser = createSelector(
  state => state.data.users,
  users => users.find(user => user &&
    user.currentUserUUID === selectCurrentUser.currentUserUUID)
)

export const createResolveCurrentUser = currentUserUUID => userFromRequest => {
  if (!userFromRequest) {
    return null
  }
  return Object.assign({ currentUserUUID }, userFromRequest)
}

export default selectCurrentUser
