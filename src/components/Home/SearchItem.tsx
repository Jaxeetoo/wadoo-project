import { useState} from 'react'
import { Input } from "@/components/ui/input";
import { ProjectDetails } from './types/ProjectType';

interface searchItemsProps {
  filterItemsFunc: (query: string) => void
}

const SearchItem = (props: searchItemsProps) => {

  const { filterItemsFunc } = props;
    
  return (
    <Input 
    placeholder="Search" 
    className="w-[40%]" 
    onChange={(e) => filterItemsFunc(e.target.value)}/>
  )
}

export default SearchItem