import axios from "axios";

const getNews = async () => {
  const apiKey = "2f3c57b9965d4cb38f62ed8090f4a3f2";
  const newsPosts = [];

  try {
    const result = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`
    );

    result.data.articles.forEach((element) => {
      const newspost = {
        title: element.title,
        postText: element.description,
        username: element.author,
        updatedAt: element.publishedAt,
        url: element.url
      };
      newsPosts.push(newspost);
    });

    return newsPosts;
  } catch (err) {
    console.log(err.message);
    return []; // Return an empty array in case of error
  }
};

export default getNews;
