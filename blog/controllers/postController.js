const post = require('../models/Post');


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await post.create({ title, content, authorId: req.user.id });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.putPost = async (req, res) => {
    try {
        const postToUpdate = await post.findByPk(req.params.id);
        if (!postToUpdate) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (postToUpdate.authorId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await postToUpdate.update({ title: req.body.title, content: req.body.content });
        res.status(200).json(postToUpdate);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postToDelete = await post.findByPk(req.params.id);
        if (!postToDelete) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (postToDelete.authorId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await postToDelete.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};