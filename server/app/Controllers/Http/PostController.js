'use strict'

const Post = use('App/Models/Post')

class PostController {
  async index () {
    return await Post.all()
  }

  async store ({ request }) {
    const data = request.only(['title', 'content'])
    return await Post.create(data)
  }

  async show ({ params }) {
    return await Post.findOrFail(params.id)
  }

  async update ({ params, request }) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'content'])
    post.merge(data)
    await post.save()
    return post
  }

  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return post
  }
}

module.exports = PostController
