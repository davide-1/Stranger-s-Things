import {
    Box,
    Container,
    Stack,
    Text,
    Flex,
    VStack,
    Button,
    Heading,
    StackDivider,
    List,
    ListItem,
  } from "@chakra-ui/react";
  import { MdLocalShipping } from "react-icons/md";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  
  function SinglePost({ token }) {
    const { postId } = useParams();
    console.log(postId);
    const [post, setPost] = useState();
    const [content, setContent] = useState("");
    useEffect(() => {
      async function getPosts() {
        try {
          const response = await fetch(
            "https://strangers-things.herokuapp.com/api/2202-ftb-pt-web-pt/posts"
          );
          const data = await response.json();
          console.log(data);
          const singlePost = data.data.posts.filter(
            (post) => postId === post._id
          );
          setPost(singlePost[0]);
        } catch (error) {
          console.error(error);
        }
      }
      getPosts();
    }, [postId]);
    console.log(post);
    function messageContent() {
      setContent(window.prompt());
      messageSeller();
    }
    function messageSeller(e) {
      fetch(
        `https://strangers-things.herokuapp.com/api/2202-ftb-pt-web-pt/posts/${postId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: { content },
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch(console.error);
    }
    function deletePost({ token }) {
      const response = fetch(
        `https://strangers-things.herokuapp.com/api/COHORT-NAME/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch(console.error);
    }
    if (!post) {
      return <div>Loading</div>;
    }
    return (
      <Container maxW={"10xl"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          spacing={{ base: 8, md: 0 }}
          py={{ base: 18, md: 24 }}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Flex alignItems={"center"}>
                <Heading
                  alignContent={"center"}
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  alignSelf={"center"}
                  ml={"4rem"}
                >
                  {post.title}
                </Heading>
              </Flex>
              <Text align={"center"} fontWeight={500} fontSize={"3xl"}>
                {post.price.toUpperCase()}
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"}>{post.description}</Text>
              </VStack>
              <Box align={"center"}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>
  
                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Seller: {post.author?.username}
                    </Text>{" "}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Location: {post.location}
                    </Text>{" "}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Will Deliver:{post.willDeliver ? <p>Yes</p> : <p>No</p>}
                    </Text>{" "}
                  </ListItem>
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={(e) => messageContent(e)}
            >
              Message Seller
            </Button>
            {token ? (
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={(e) => deletePost(e)}
              >
                Delete Post
              </Button>
            ) : null}
            <Stack direction="row" alignItems="center" justifyContent={"center"}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </Flex>
      </Container>
    );
    //});
  }
  export default SinglePost;