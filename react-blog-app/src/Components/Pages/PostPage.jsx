import { Link, useParams } from "react-router-dom";
import Base from "../Parts/Base";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { loadPost } from "../../Services/post_service";
import { toast } from "react-toastify";
import { base_url } from "../../Services/helper_service";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    //Load post of postId
    loadPost(id)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error loading post");
      });
  }, []);

  const printDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/feed">Home</Link> /{" "}
        {post && <Link to={"/posts/" + post.id}>{post.title}</Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3 ps-3">
              {post && (
                <CardBody>
                  <CardText>
                    Posted by <b>{post.user.name}</b> on{" "}
                    <b>{printDate(post.addedDate)}</b>
                    <CardText className="mt-2">
                      <span className="text-muted">
                        {post.category.categoryTitle}
                      </span>
                    </CardText>
                    <div
                      className="divider"
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "#e2e2e2",
                      }}
                    ></div>
                  </CardText>
                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>
                  <div
                    className="image-container mt-4 shadow"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid rounded"
                      src={base_url + "/post/image/" + post.imageName}
                      alt=""
                    />
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ( {post ? post.comments.length : 0} )</h3>
            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-3 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
