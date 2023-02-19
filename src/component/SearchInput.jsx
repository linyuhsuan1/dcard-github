const SearchInput = ({onChange}) => {
    return (
        <>
        <input
            type='text'
            className='w-1/2 rounded-lg border border-gray-400 p-2'
            onChange={onChange}
            placeholder='Search'
        />
        </>
    )
}
export default SearchInput;