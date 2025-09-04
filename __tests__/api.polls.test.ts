// Provide minimal globals and mocks before importing the route
(global as any).Request = class {}

jest.mock('next/server', () => ({
  NextRequest: class {},
  NextResponse: {
    json: (body: any, opts?: any) => ({
      status: opts?.status || 200,
      json: async () => body
    })
  }
}))

jest.mock('next/headers', () => ({
  cookies: () => ({
    // minimal cookie store used by createRouteHandlerClient in tests
    get: () => null
  })
}))

// Explicitly mock the server supabase helper to return the shape used by the route
jest.mock('@/lib/supabase-server', () => ({
  createServerSupabaseClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: { id: 'test-user' } } }),
    },
    from: (table: string) => {
      const ctx: any = { table }
      return {
        insert: function (payload: any) {
          ctx.payload = payload
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

          if (table === 'poll_options') {
            return {
              select: async function () {
                const options = Array.isArray(ctx.payload)
                  ? ctx.payload.map((opt: any, i: number) => ({ id: `opt-${i + 1}`, option_text: opt.option_text, poll_id: opt.poll_id }))
                  : []
                return { data: options, error: null }
              }
            }
          }

          return {
            select: async function () {
              return { data: null, error: null }
            }
          }
        },
        update: function (payload: any) { ctx.payload = payload; return { eq: function () { return { data: null, error: null } } } },
        eq: function () { return this }
      }
    }
  })
}))

import { POST } from '@/app/api/polls/route'

describe('POST /api/polls', () => {
  it('creates a poll and returns 201', async () => {
    const body = { title: 'Test Poll', options: ['A', 'B'] }
    const request = {
      json: async () => body
    }

    const res = await POST(request as any)
    const resJson = await res.json()

    expect(res.status).toBe(201)
    expect(resJson.poll).toBeDefined()
    expect(resJson.poll.options).toBeDefined()
    expect(resJson.poll.qr_code_link).toContain('/polls/poll-1')
  })
})
