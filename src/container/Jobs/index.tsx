import React, { FC, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Typography, Grid, Pagination, CircularProgress, TextField, Button, IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import JobCard from '../../components/JobCard';
import JobDetailCard from '../../components/JobDetailCard';
import { Job, JobsResponse, fetchJobs } from '../../services/jobs';


const JobsContainer: FC = () => {
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [currentJob, setCurrentJob] = useState<Job | undefined>(undefined);
    const {
      isLoading,
      isError,
      error,
      data,
      refetch,
    } = useQuery<JobsResponse, Error>({
        queryKey: ['jobs', page, keyword.split(" ").join("-")],
        queryFn: () => fetchJobs(page, keyword),
        keepPreviousData : true,
        refetchOnWindowFocus: false,
        enabled: false
    });

    useEffect(() => {
        refetch();
    }, [refetch, page]);

    useEffect(() => {
        if (currentJob) {
            window.scrollTo(0, 0);
        }
    }, [currentJob]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page - 1);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearchClick = (event: React.MouseEvent) => {
        handleSearch();
    };

    const handleSearch = () => {
        if (page !== 0) {
            setPage(0);
        } else {
            refetch();
        }
    };

    const handleViewClick = (job: Job) => {
        setCurrentJob(job);
    };

    return (
      <Container fixed>
        <Box display="flex" justifyContent="space-between" sx={{ padding: 2, backgroundColor: "#eee", mb: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <TextField
                variant="outlined"
                placeholder="Job Title"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{ backgroundColor: "#fff" }}
            />
            <Button variant="contained" onClick={handleSearchClick}>Search</Button>
        </Box>
        <Typography variant="h5" sx={{ mb: 2 }}>Recent Openings</Typography>
        {currentJob ? (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ height: 500, overflowY: "scroll", mb: 4 }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : isError ? (
                            <Typography>Error: {error.message}</Typography>
                        ) : (
                        <>
                            {data.jobs.map((job: Job) => (
                                <JobCard key={job.uuid} job={job} type="simple" handleViewClick={handleViewClick} />
                            ))}
                        </>
                        )}
                    </Box>
                    <Pagination count={data ? Math.ceil(data.total / data.limit) : 0} page={page + 1} onChange={handlePageChange} />
                </Grid>
                <Grid
                    item xs={12}
                    sm={8}
                    sx={{
                        position: { xs: "absolute", sm: "static" },
                        top: { xs: 0 },
                        backgroundColor: { xs: "white", sm: "unset" },
                        paddingRight: { xs: 2, sm: 0 },
                        paddingBottom: { xs: 2, sm: 0 },
                        width: { xs: "100%", sm: "auto" },
                        minHeight: { xs: "100vh", sm: 0 }
                    }}
                >
                    <IconButton sx={{ mb: 2 }} onClick={() => setCurrentJob(undefined)}>
                        <UndoIcon />
                    </IconButton>
                    <JobDetailCard job={currentJob} />
                </Grid>
            </Grid>
        ) : (
            <>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {isLoading ? (
                        <Grid item xs={12}><CircularProgress /></Grid>
                    ) : isError ? (
                        <Grid item xs={12}>Error: {error.message}</Grid>
                    ) : (
                    <>
                        {data.jobs.map((job: Job) => (
                            <Grid item key={job.uuid} xs={12} md={4} lg={2}>
                                <JobCard job={job} handleViewClick={handleViewClick} />
                            </Grid>
                        ))}
                    </>
                    )}
                </Grid>
                <Box display="flex" justifyContent="center">
                    <Pagination count={data ? Math.ceil(data.total / data.limit) : 0} page={page + 1} onChange={handlePageChange} />
                </Box>
            </>
        )}
      </Container>
    )
}

export default JobsContainer;