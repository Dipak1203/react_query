import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  Img,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
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
// interface SearchParamsType {
//   skip: number;
//   limit: number;
// }

export default function ProductPage() {
  const [productData, setProductData] = useState<ProductType[] | null>(null);

  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams({
    skip: 0,
    limit: 3,
  });

  // @ts-ignore
  const skip: any = parseInt(searchParams.get("skip") || 0);
  // @ts-ignore
  const limit: any = parseInt(searchParams.get("limit") || 3);
  const searchQuery: any = searchParams.get("q") || "";
  const category = searchParams.get("category");

  const { data: product } = useQuery({
    queryKey: ["product", limit, skip, searchQuery, category],
    queryFn: async () => {
      // return await fetch(
      //   `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${searchQuery}`
      // ).then((res) => res.json());

      let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${searchQuery}`;
      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      }
      const data = await fetch(url).then((res) => res.json());

      return data;
    },
  });

  // console.log(product)

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
    placeholderData: keepPreviousData,
    staleTime: 20000,
  });

  const handleMove = (count: number) => {
    setSearchParams((prev) => {
      const newSearchParams = new URLSearchParams(prev.toString());
  
      // Update the 'skip' parameter
      const newSkip = Math.max(skip + count, 0);
      newSearchParams.set("skip", newSkip.toString());
  
      return newSearchParams;
    });
    // setSkip((prevSkip) =>{
    //   return Math.max(prevSkip + count,0)
    // })
  };

  return (
    <>
      <Container mt="14px">
        <Flex gap="25px">
          <Box>
            <Input
              type="text"
              placeholder="Search product here ....."
              name="search"
              onChange={debounce((e: any) => {
                setSearchParams((prev) => {
                  prev.set("q", e.target.value);
                  // @ts-ignore
                  prev.set("skip", 0);
                  prev.delete("category");
                  return prev;
                });
              }, 1000)}
            />
          </Box>
          <Box>
            <Select
              placeholder="Select the Category"
              onChange={(e: any) => {
                setSearchParams((prev) => {
                  // @ts-ignore
                  prev.set("skip", 0);
                  prev.delete("q");
                  prev.set("category", e.target.value);
                  return prev;
                });
              }}
            >
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
          // @ts-ignore
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

      <Container>
        <Flex gap={"20px"} justifyContent={"space-between"} my={"20px"}>
          <Button disabled={skip < limit} onClick={() => handleMove(-limit)}>
            Prev
          </Button>
          <Button
          // @ts-ignore
            disabled={limit + skip >= productData?.total}
            onClick={() => handleMove(limit)}
          >
            Next
          </Button>
        </Flex>
      </Container>
    </>
  );
}
