import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {


    // articles = [
    //     {
    //         "source": {
    //             "id": "ars-technica",
    //             "name": "Ars Technica"
    //         },
    //         "author": "Chuong Nguyen",
    //         "title": "Dealmaster: Power tools, laptops, gaming accessories, and more",
    //         "description": "Top summer savings on tech products, from power tools to gaming laptops.",
    //         "url": "https://arstechnica.com/shopping/2023/06/dealmaster-power-tools-laptops-gaming-accessories-and-more/",
    //         "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2020/05/Razer-Blade-Pro-17-760x380.jpg",
    //         "publishedAt": "2023-06-22T00:12:36Z",
    //         "content": "Enlarge/ The Razer Blade Pro 17 gaming laptop.\r\n4 with \r\nWhether you spend your summer relaxing with a new gaming laptop or grab some new power tools for home repairs, there are plenty of ways to sta… [+9847 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "The Guardian"
    //         },
    //         "author": "Anya von Bremzen",
    //         "title": "‘I no longer know how to think about borsch’",
    //         "description": "The soup of my childhood has become a symbol of Putin’s assault on Ukrainian land, culture and heritage, of his drive to plunder and obliterate UkraineOn 25 February 2022, I woke up after a turbulent night checking news updates about Putin’s invasion of Ukrai…",
    //         "url": "https://www.theguardian.com/news/2023/jun/22/i-no-longer-know-how-to-think-about-borsch",
    //         "urlToImage": "https://i.guim.co.uk/img/media/660e9451a308f94100089d48c26b0d77270974c6/0_192_5760_3456/master/5760.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=1ca1fbfcd62d3b1dc5bf3a6e46ee839f",
    //         "publishedAt": "2023-06-22T05:00:02Z",
    //         "content": "On 25 February 2022, I woke up after a turbulent night checking news updates about Putins invasion of Ukraine. Amid the shock and bouts of crying and doomscrolling, a seemingly trivial yet intimately… [+24610 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "MacRumors"
    //         },
    //         "author": "Juli Clover",
    //         "title": "Apple Vision Pro 'Visual Search' Feature Can Identify Items, Copy Printed Text, Translate and More",
    //         "description": "The Apple Vision Pro headset's visionOS operating system includes a feature called \"Visual Search,\" which sounds like it is similar to the Visual Lookup feature on the iPhone and the iPad.\n\n\n\n\n\nWith Visual Search, users can use the Vision Pro headset to get i…",
    //         "url": "https://www.macrumors.com/2023/06/21/vision-pro-visual-search-feature/",
    //         "urlToImage": "https://images.macrumors.com/t/_3ZdexFpOCvS8zchAikSJtoScBg=/2698x/article-new/2023/06/vision-pro-headset-1.jpg",
    //         "publishedAt": "2023-06-22T00:39:15Z",
    //         "content": "The Apple Vision Pro headset's visionOS operating system includes a feature called \"Visual Search,\" which sounds like it is similar to the Visual Lookup feature on the iPhone and the iPad.\r\nWith Visu… [+1181 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Hipertextual"
    //         },
    //         "author": "Víctor Millán",
    //         "title": "El gran reto de las Vision Pro, en cifras: levantar un mercado insignificante hasta ahora",
    //         "description": "El mercado de las gafas de AR y VR está muy lejos de ser similar al de los teléfonos móviles en el lanzamiento del iPhone, lo cual llena de incógnitas el futuro de estos dispositivos.",
    //         "url": "http://hipertextual.com/2023/06/apple-vision-pro-mercado-ar-vr",
    //         "urlToImage": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/06/apple-vision-pro.jpg?fit=2367%2C1421&quality=50&strip=all&ssl=1",
    //         "publishedAt": "2023-06-22T07:00:00Z",
    //         "content": "Apple ya ha desvelado sus cartas. Las Vision Pro son las gafas de realidad aumentada (o extendida, según a quién le preguntes) en las que la empresa de Cupertino llevaba tanto tiempo trabajando. El g… [+4834 chars]"
    //     }
    // ]

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8db7848f148c4aa0be1010425dd00180&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        
        this.setState({
            page: this.state.page + 1
        })

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            // loading:false
        });

    }

    async componentDidMount() {

        this.props.setProgress(10);
        
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8db7848f148c4aa0be1010425dd00180&page=1&pageSize=${this.props.pageSize}`;
        this.props.setProgress(20);
        
        this.setState({ loading: true });
        
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.props.setProgress(70);
        
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);

    }

    handlePrev = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8db7848f148c4aa0be1010425dd00180&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })


    }
    handleNext = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8db7848f148c4aa0be1010425dd00180&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });

            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }


    }

    render() {

        return (
            // <div className='container' style={{ marginBottom: "30px" }} >
            < >

                <h2 className='text-center' style={{ color: "#E3E3E3", margin: "90px 0px 40px 0px" }}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length !== this.state.totalResults} // Replace with a condition based on your data source
                    loader={<Spinner />}

                // endMessage={<p>No more data to load.</p>}
                >
                    <div className="container">
                        <div className="row">

                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 38) : ""} description={element.description ? element.description.slice(0, 72) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} url={element.url} author={element.author} date={element.publishedAt} name={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>
                <br />
                <br />

                {/* <div className="container d-flex justify-content-between">
                    <button style={{backgroundColor:"grey",color:"white"}} disabled={this.state.page <= 1} type="button" className="btn btn-lg btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                    <button style={{backgroundColor:"grey",color:"white"}} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-lg btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}
