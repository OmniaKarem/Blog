const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Blog API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Email already in use' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login and get JWT token',
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Returns JWT token' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/posts': {
      get: {
        summary: 'Get all posts',
        tags: ['Posts'],
        responses: { 200: { description: 'List of all posts' } },
      },
      post: {
        summary: 'Create a new post',
        tags: ['Posts'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Post created successfully' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/posts/{id}': {
      put: {
        summary: 'Update a post',
        tags: ['Posts'],
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Post updated successfully' },
          403: { description: 'Forbidden' },
          404: { description: 'Post not found' },
        },
      },
      delete: {
        summary: 'Delete a post',
        tags: ['Posts'],
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Post deleted successfully' },
          403: { description: 'Forbidden' },
          404: { description: 'Post not found' },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;