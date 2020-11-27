import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Pagination } from '@material-ui/lab';
import './Style.css/Blog.css'


const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
                setBlogs(res.data);
            }
            catch (err) {

            }
        }

        fetchBlogs();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        else
            return '';
    };

    const getBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <>
                    <div className="post-item">
                        <div className="post-information">
                            <div className="post-date">{blogPost.year}/{blogPost.month}/{blogPost.day}</div>
                            <strong className="post-category" id={blogPost.category}>{capitalizeFirstLetter(blogPost.category)}</strong>
                            <Link to={`/blog/${blogPost.slug}`} className="post-title"> 
                                <h3 className="post-title">{blogPost.title}</h3>
                            </Link>
                            <p className="post-excerpt">{blogPost.excerpt}</p>
                            <Link to={`/blog/${blogPost.slug}`} className="post-link">Continue reading</Link>
                        </div>
                        <div className="post-thumbnail">
                            <img width="235" height="250" src={blogPost.thumbnail} alt='' />
                        </div>
                    </div>
                </>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='posts-row'>
                    <div className='post-left'>
                        {list[i]}
                    </div>
                    <div className='post-right'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            );
        }
        return result;
    };

    return (
        <>
            <div className="category-list">
                <nav className="category-navbar">
                    <Link className="category-item" id="python" to="/category/python">Python</Link>
                    <Link className="category-item" id="go" to="/category/go">Go</Link>
                    <Link className="category-item" id="react" to="/category/react">React</Link>
                    <Link className="category-item" id="javascript" to="/category/javascript">JavaScript</Link>
                    <Link className="category-item" id="git" to="/category/git">Git</Link>
                    <Link className="category-item" id="aws" to="/category/aws">AWS</Link>
                    <Link className="category-item" id="business" to="/category/business">BUSINESS</Link>
                    <Link className="category-item" id="book" to="/category/book">BOOK</Link>
                </nav> 
            </div>

            <div className="recent-posts">
                <div className="recent-title-top">
                    <h3>Recent Posts</h3>
                </div>
                <div className="title-border"></div>
            </div>

            <div className="blog">
                <nav className="post-list">
                    {getBlogs()}
                </nav>
            </div>

            {/* <Pagination count={10} /> */}
        </>
    );
};

export default Blog;