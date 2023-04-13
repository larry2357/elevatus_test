import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Job } from '../services/jobs';
import { beautifyDate, convertLanguages } from '../services/utils';

interface JobDetailCardProps {
    job: Job;
};

const JobDetailCard: FC<JobDetailCardProps> = ({ job }: JobDetailCardProps) => {
    

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {job.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                    Posted on: {beautifyDate(job.posted_at)}
                </Typography>
                {job.description && (
                    <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Description
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />
                    </>
                )}
                {job.requirements && (
                    <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Requirements
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                    </>
                )}
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Summary
                </Typography>
                <Grid container sx={{ border: '1px solid #ccc', mb: 2 }}>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Salary range:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{job.salary.min}-{job.salary.max}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Industry:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{job.industry.length > 0 ? job.industry.join(","): '-'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Experience Required:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{job.years_of_experience.length > 0 ? job.years_of_experience.join(","): '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Major:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{job.major.length > 0 ? job.major.join(","): '-'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Career Level:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{job.career_level.length > 0 ? job.career_level.join(","): '-'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Minimum GPA:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{job.gpa || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {job.skills.length > 0 && (
                    <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Required Skills
                        </Typography>
                        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                            {job.skills.map((skill) => <Chip label={skill} key={skill} sx={{ boxShadow: 1, cursor: "pointer", margin: 0.5 }} />)}
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                    </>
                )}
                {job.languages.length > 0 && (
                    <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Lanuguages
                        </Typography>
                        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                            {convertLanguages(job.languages).map((lang) => <Chip label={lang} key={lang} sx={{ boxShadow: 1, cursor: "pointer", margin: 0.5 }} />)}
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                    </>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
                <Box display="flex" alignItems="center">
                    <Typography sx={{ fontWeight: 600 }}>Share</Typography>
                    <IconButton color="primary" size="large"><FacebookRoundedIcon /></IconButton>
                </Box>
                <Button variant="contained">Apply</Button>
            </CardActions>
        </Card>
    );
}

export default React.memo(JobDetailCard);