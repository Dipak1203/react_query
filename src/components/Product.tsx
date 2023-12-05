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
  Img,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [productData, setProductData] = useState<ProductType[] | null>(null);
  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products").then((res) =>
        res.json()
      );
    },
  });

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products/categories").then(
        (res) => res.json()
      );
    },
  });

  return (
    <>
      <Container mt="14px">
        <Flex gap="25px">
          <Box>
            <Input type="text" placeholder="Search product here ....." />
          </Box>
          <Box>
            <Select placeholder="Select the Category">
              {categories?.map((category: string, index: number) => (
                <option value={category} key={index}>
                  {category}
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
        {productData &&
          productData?.products?.map((product: ProductType) => {
            return (
              <Card key={product.id} height="100%">
                <Img
                  src={product.thumbnail}
                  alt={product.title}
                  w="100%"
                  h="200px" // Set a fixed height for the image
                  objectFit="cover" // Maintain aspect ratio
                />
                <CardHeader>
                  <Heading size="md">{product.title}</Heading>
                </CardHeader>
                <CardBody>
                  <p>{product.description}</p>
                </CardBody>
                <CardFooter justifyContent="space-between">
                  <Button bg="green">Add to Cart</Button>
                  <Button>View</Button>
                </CardFooter>
              </Card>
            );
          })}
      </SimpleGrid>
    </>
  );
}
