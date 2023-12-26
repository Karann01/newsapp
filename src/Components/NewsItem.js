import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, url, author, date, name } = this.props
        return (
            <div className='my-3'>
                <div className="card" style={{ height: "30rem" }}>
                    <img style={{ height: "12rem" }} src={imageUrl ? imageUrl : "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="} className="card-img-top" alt="..." />
                    <div className="card-body" style={{ height: "12rem" }}>
                        
                        <span style={{backgroundColor:"#999966",color:"white",padding:"5px",borderRadius:"10px",fontSize:"12px",left:"75%",top:"-2%",position:"absolute",zIndex:"1"}}><b>{name}</b></span>

                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <br />
                        <a href={url} rel="noreferrer" target='_blank' className="btn btn-md btn-success">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
