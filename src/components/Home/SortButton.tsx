import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

interface sortProps {
  callbackFunc : (value: string) => void;
}

const SortButton = (props: sortProps) => {
  const { callbackFunc } = props;

  return (
    <Select onValueChange={callbackFunc}>
      <SelectTrigger className="w-[10rem]">
        <SelectValue placeholder="sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ascending">ascending</SelectItem>
        <SelectItem value="descending">descending</SelectItem>
        <SelectItem value="date_created">date created</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortButton