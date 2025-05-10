import React, { useEffect } from 'react'
import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.jsx';

const Homepage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
        <Text
            bgGradient='linear(to-r, cyan.400, blue.500)'
            bgClip='text'
            fontSize={{ base: "22", sm: "28"}}
            fontWeight='extrabold'
            textTransform={"uppercase"}
        >
          Current Products
        </Text>
        { products.length !== 0 ? 
          <SimpleGrid columns={{base:1, md:2, lg:3}} spacing={10} w={'full'}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </SimpleGrid>
        :
          <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'greay.500'}>
            No products found {" "}
            <Link to={"/create"}>
              <Text as={'span'} color={'blue.500'} _hover={{textDecoration: "underline"}}>
                Create a product
              </Text>
            </Link>
          </Text>
        }
      </VStack>
    </Container>
  )
}

export default Homepage