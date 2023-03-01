interface SearchProps{
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = ({onChange}:SearchProps) => {
    return (
        <>
        <input
            type='text'
            className='w-full rounded-lg border border-gray-400 p-2'
            onChange={onChange}
            placeholder='Search'
        />
        </>
    )
}
export default SearchInput;