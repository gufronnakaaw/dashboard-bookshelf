import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ModalCreate from '@/components/ModalCreate';
import ModalDetail from '@/components/ModalDetail';
import fetcher from '@/utils/fetcher';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import Head from 'next/head';
import { useState } from 'react';
import useSWR from 'swr';

const TABLE_HEAD = ['No', 'Name', 'Year', 'Author', 'Publisher', 'Action'];

export default function Home(props) {
  const [page, setPage] = useState(props.books.page);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [detailBook, setDetailBook] = useState({
    page_count: 0,
    summary: '',
  });

  const {
    data: books,
    isLoading,
    mutate,
  } = useSWR(
    `/books?page=${page}`,
    async (url) => {
      try {
        const { data } = await fetcher(url, 'GET');
        return data;
      } catch (error) {
        return error;
      }
    },
    {
      fallback: props.books,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  let startIndex = (books.page - 1) * 10;

  async function handleDelete(book_id) {
    try {
      await fetcher('/books', 'DELETE', { book_id });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard Bookshelf</title>
      </Head>

      <Layout>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Books list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all Books
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={() => setOpenCreate(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add book
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <table className="mt-4 w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 "
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-center gap-2 font-normal leading-none opacity-70 "
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {books.data.map((book, index) => {
                  const isLast = index === books.data.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={book.book_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {(startIndex += 1)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {book.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {book.year}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {book.author}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {book.publisher}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Detail Book">
                          <IconButton
                            variant="text"
                            onClick={() => {
                              const { page_count, summary } = book;

                              setDetailBook({
                                page_count,
                                summary,
                              });
                              setOpenDetail(true);
                            }}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Book">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Book">
                          <IconButton
                            variant="text"
                            onClick={() => {
                              if (confirm('are you sure?')) {
                                handleDelete(book.book_id);
                              }
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {books.page} of {books.total_page}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => setPage(books.page - 1)}
                disabled={books.page == 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() => setPage(books.page + 1)}
                disabled={books.page == books.total_page}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Layout>

      <ModalCreate open={openCreate} setOpen={setOpenCreate} mutate={mutate} />

      <ModalDetail
        open={openDetail}
        setOpen={setOpenDetail}
        data={detailBook}
      />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await fetcher('/books', 'GET');

    if (data.success) {
      return {
        props: {
          books: data,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
