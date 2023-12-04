import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Container, Divider, Flex, Heading, Input, Select, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
};
export default function ProductPage() {
  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products").then((res) =>
        res.json()
      );
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products/categories").then(
        (res) => res.json()
      );
    },
  });
  console.log(product);
  return (
    <>
     <Container>
     <Flex gap="25px">
        <Box>
          <Input type="text" placeholder="Search product here ....." />
        </Box>
        <Box>
          <Select placeholder="Select the Category">
            {categories?.map((categories: [], index: number) => (
              <option value={categories} key={index}>
                {categories}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
     </Container>

      <Flex>
        <Box>
          <Card maxW="sm">
            <CardBody>
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                // borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Living room Sofa</Heading>
                <Box>
                  This sofa is perfect for modern tropical spaces, baroque
                  inspired spaces, earthy toned spaces and for people who love a
                  chic design with a sprinkle of vintage design.
                </Box>
                <Box color="blue.600" fontSize="2xl">
                  $450
                </Box>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Box>
      </Flex>
    </>
  );
}
