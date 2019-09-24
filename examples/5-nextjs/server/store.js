const store = {
  todos: [
    {
      id: '0',
      text: 'Go to the shops',
      done: false,
      assignee: 'rsanchez'
    },
    {
      id: '1',
      text: 'Pick up the kids',
      done: true,
      assignee: null
    },
    {
      id: '2',
      text: 'Install mst-gql',
      done: true,
      assignee: 'msmith'
    }
  ],
  users: [
    {
      id: 'rsanchez',
      name: 'Rick Sanchez',
      likes: ['computers', 'Kalaxian Crystals']
    },
    {
      id: 'msmith',
      name: 'Morty Smith',
      likes: ['Jessica']
    }
  ]
}

// Force frequently changing data in user
/* setInterval(() => {
  store.users.forEach(user => {
    user.name = user.name.split(' ').reverse().join(' ')
  })
}, 500) */

module.exports = { store }
