import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/Style.css/BlogDetail.css'
import '../components/Style.css/Blog.css'

import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderers = {
    code: ({language, value}) => {
        return <SyntaxHighlighter style={vscDarkPlus} language={language} children={value} />
    }
}

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});
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

    useEffect(() => {
        const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`);
                setBlog(res.data);
            }
            catch (err) {

            }
        }

        fetchData();
    }, [props.match.params.id]);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        else
            return '';
    };

    // const createBlog = () => {
    // // ↓blogディレクトリのmodleのcontent
    //     return {__html: blog.text};
    // };

    const getBlogTitle = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <>
                    <Link to={`/blog/${blogPost.slug}`} className="side-bar-post-link">
                        {"\> "} {blogPost.title}
                    </Link>
                </>
            )
        })

        for (let i = 0; i < 5; i++) {
            result.push(
                list[i]
            )
        }
        return result;
    }
    return (
        <>
            <div className="category-list">
                <nav className="category-navbar">
                    <Link className="category-item" id="python" to="/category/python">Python</Link>
                    <Link className="category-item" id="django" to="/category/django">Django</Link>
                    <Link className="category-item" id="go" to="/category/go">Go</Link>
                    <Link className="category-item" id="react" to="/category/react">React</Link>
                    <Link className="category-item" id="javascript" to="/category/javascript">JavaScript</Link>
                    <Link className="category-item" id="git" to="/category/git">Git</Link>
                    <Link className="category-item" id="aws" to="/category/aws">AWS</Link>
                    <Link className="category-item" id="book" to="/category/book">BOOK</Link>
                </nav> 
            </div>
            <div className='detail-content'>
                <div className='post'>
                    <div className='post-content'>
                        <h5 className='date'>{blog.year}/{blog.month}/{blog.day}</h5>
                        <h4 className='category' id={blog.category}>{capitalizeFirstLetter(blog.category)}</h4>
                        <h1 className='title'>{blog.title}</h1>

                        <hr />
                        {/* <div className='content' dangerouslySetInnerHTML={createBlog()} /> */}
                        <ReactMarkdown renderers={renderers} children={blog.content} />

                        <p className='back-to-blog'><Link to='/blog' className="font-weight-bold">Back to Blogs</Link></p>
                        <hr />
                    </div>
                </div>
            
                <div className='side-bar'>
                    <div className='side-bar-recent_posts'>
                        <h4>Recent posts</h4>
                        <div className='recent-post-list'>
                                {getBlogTitle()}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default BlogDetail;