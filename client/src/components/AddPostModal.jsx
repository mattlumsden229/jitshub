import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../mutations/postMutations";
import { GET_POSTS } from "../queries/postQueries";

export default function AddPostModal() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [forum, setForum] = useState('general')
    const [userId] = useState('640bac26192ec24e780c7eec');

    const [addPost] = useMutation(ADD_POST, {
        variables: { title, description, forum, userId },
        update(cache, { data: { addPost } }) {
            const { posts } = cache.readQuery({ query: GET_POSTS });
            cache.writeQuery({
                query: GET_POSTS,
                data: { posts: [...posts, addPost] },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '' || description === '') {
            return alert('Please fill out all fields');
        }

        addPost(title, description, forum, userId);
    };

    // if (loading) return null;
    // if (error) return 'Something Went Wrong';

    return (
        <>
            <button type='button' className="btn btn-outline-dark" data-bs-toggle='modal' data-bs-target='#addPostModal'>
                Create New Post
            </button>

            <div className="modal fade" id="addPostModal" aria-labelledby="addPostModalLabel" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addPostModalLabel">
                                New Post
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Forum</label>
                                    <select
                                        id='forum'
                                        className='form-select'
                                        value={forum}
                                        onChange={(e) => setForum(e.target.value)}
                                    >
                                        <option value='general'>General</option>
                                        <option value='tournaments'>Tournaments</option>
                                    </select>
                                </div>

                                <button type="submit" data-bs-dismiss='modal' className="btn btn-dark">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}