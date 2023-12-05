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
interface SearchParamsType {
  skip: number;
  limit: number;
}

export default function ProductPage() {
  const [productData, setProductData] = useState<ProductType[] | null>(null);

  const [searchParams,setSearchParams] = useSearchParams<SearchParamsType>({skip:0,limit:3}) 

  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 3);


  const [search,setSearch] = useState('');


  const { data: product } = useQuery({
    queryKey: ["product",limit,skip],
    queryFn: async () => {
      return await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then((res) =>
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
    placeholderData:keepPreviousData
  });



  const handleMove  = (count:number) =>{  

    setSearchParams((prev) =>{
      searchParams.set("skip",Math.max(skip + count,0))
      return prev;
    })
      // setSkip((prevSkip) =>{
      //   return Math.max(prevSkip + count,0)
      // })
  }
  return (
    <>
      <Container mt="14px">
        <Flex gap="25px">
          <Box>
            <Input type="text" placeholder="Search product here ....." name="search" onChange={(e) => setSearch(e.target.value)}/>
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


     <Container>
     <Flex gap={"20px"} justifyContent={"space-between"} my={"20px"}>
        <Button onClick={() => handleMove(-limit)}>Prev</Button>
        <Button onClick={() => handleMove(limit)}>Next</Button>
      </Flex>
     </Container>
    </>
  );
}
