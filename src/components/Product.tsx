import { Box, Container, Flex, Input, Select } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
    queryKey: ['categories'],
    queryFn: async () => {
        return await fetch('https://dummyjson.com/products/categories').then((res) =>
            res.json()
        );
    },
});
  console.log(product);
  return (
    <Container marginTop="50px">
      <Flex gap="25px">
        <Box>
          <Input type="text" placeholder="Search product here ....." />
        </Box>
        <Box>
          <Select placeholder="Select the Category">
           {
            categories?.map((categories:[],index:number) =>(
                <option value={categories} key={index}>{categories}</option>
            ))
           }
          </Select>
        </Box>
      </Flex>
    </Container>
  );
}
