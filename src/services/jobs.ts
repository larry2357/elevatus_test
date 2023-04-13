import { AxiosResponse } from 'axios';
import axios from './axios';

export interface Job {
    applied_at: string | null;
    career_level: string[];
    company_uuid: string;
    degree: string[];
    description: string;
    gender: string | null;
    geolocation: {
        latitude: number;
        longitude: number;
    };
    gpa: number;
    has_profile: boolean;
    industry: string[];
    is_applied: boolean;
    is_top: boolean;
    job_type: string[];
    languages: { [key: string]: number; }[];
    location: { country: string; city: string; };
    major: string[];
    nationality: string[];
    outside: boolean;
    outside_key: string | null;
    posted_at: string;
    requirements: string | null;
    salary: { min: number; max: number; };
    score: number;
    skills: string[];
    title: string;
    translations: string | null;
    uri: string;
    url: string;
    uuid: string;
    visa_sponsorship: boolean;
    willing_to_relocate: boolean;
    willing_to_travel: boolean;
    years_of_experience: number[];
}

export interface JobsResponse {
    jobs: Job[],
    total: number;
    limit: number;
    page: number;
}

export const fetchJobs = async (page = 0, keyword = ""): Promise<JobsResponse> => {
    const { data }: AxiosResponse<{ message: string; status_code: number; results: JobsResponse; }> = await axios.get('/jobs', { params: { language_profile_uuid: 'ee5d991c-cdc6-4e83-b0b3-96f147208549', page, limit: 12, itemQuery: keyword }});
    console.log("*********", data.results);
    return data.results;
}