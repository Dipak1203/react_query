import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
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
      <Container mt="14px">
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

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
        px="15px"
        mt="20px"
      >
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <p>View a summary of all your customers over the last month.</p>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <p>View a summary of all your customers over the last month.</p>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <p>View a summary of all your customers over the last month.</p>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </>
  );
}
