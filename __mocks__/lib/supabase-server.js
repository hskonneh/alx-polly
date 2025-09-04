module.exports = {
  createServerSupabaseClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: { id: 'test-user' } } }),
    },
    from: (table) => {
      const ctx = { table }

      return {
        insert: function (payload) {
          ctx.payload = payload

          // For polls, need chainable select().single()
          if (table === 'polls') {
            return {
              select: function () {
                return {
                  single: async function () {
                    return { data: { id: 'poll-1', title: ctx.payload.title, creator_id: 'test-user' }, error: null }
                  }
                }
              }
            }
          }

          // For poll_options, select returns array of created options
          if (table === 'poll_options') {
            return {
              select: async function () {
                const options = Array.isArray(ctx.payload)
                  ? ctx.payload.map((opt, i) => ({ id: `opt-${i + 1}`, option_text: opt.option_text, poll_id: opt.poll_id }))
                  : []
                return { data: options, error: null }
              }
            }
          }

          // Default chainable object
          return {
            select: async function () { return { data: null, error: null } }
          }
        },
        update: function (payload) { ctx.payload = payload; return { eq: function () { return { data: null, error: null } } } },
        eq: function () { return this }
      }
    }
  })
}
