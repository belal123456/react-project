// src/components/Posts.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaHeart, FaEllipsisV } from "react-icons/fa";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (err) {
        setError("Error fetching posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (postId, currentLikes, liked) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: liked ? (currentLikes || 0) - 1 : (currentLikes || 0) + 1,
        likedBy: liked ? [] : [user.uid], // Simplified example, should use an array in real implementation
      });
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: liked
                  ? (currentLikes || 0) - 1
                  : (currentLikes || 0) + 1,
                likedBy: liked ? [] : [user.uid],
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleEdit = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, { content: editContent });
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, content: editContent } : post
        )
      );
      setEditModalOpen(null);
      setEditContent("");
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const toggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
  };

  const toggleEditModal = (postId, currentContent) => {
    setEditModalOpen(editModalOpen === postId ? null : postId);
    setEditContent(currentContent);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        posts.map((post) => {
          const liked = post.likedBy && post.likedBy.includes(user?.uid);
          return (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-lg mb-6 relative"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                {user?.uid === post.userId && (
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => toggleDropdown(post.id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownOpen === post.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => toggleEditModal(post.id, post.content)}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              {post.photoUrl && (
                <img
                  src={post.photoUrl}
                  alt={post.title}
                  className="rounded-lg mb-4"
                />
              )}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLike(post.id, post.likes, liked)}
                  className={`flex items-center ${
                    liked ? "text-red-500" : "text-gray-500"
                  } hover:text-red-600`}
                >
                  <FaHeart className="mr-2" /> Like ({post.likes || 0})
                </button>
              </div>

              {editModalOpen === post.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">Edit Post</h3>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setEditModalOpen(null)}
                        className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(post.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Posts;
