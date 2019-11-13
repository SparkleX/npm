import {Query} from "../src/index"
class ScheuledJob {
	JobGroupId:Number;
}

export class ScheuledJobRepository{

    @Query('select "JobGroupId" from "x4/job/ScheuledJob" where "JobRunId" = $1')
	public async findByJobRunId(jobRunId:Number):Promise<ScheuledJob[]> {return null}

	@Query('select * from "x4/job/ScheuledJob" where "JobGroupId" = $1')
	public async findByJobGroupId(groupId:Number):Promise<ScheuledJob[]> {return null}

	...

	...
}








let scheuledJobRepository:ScheuledJobRepository;
var jobRunInfo = {jobRunId:1};

let queryResult:ScheuledJob[] = await scheuledJobRepository.findByJobRunId(jobRunInfo.jobRunId);

let groupId = null;
if(queryResult.length>0) {
	groupId = queryResult[0].JobGroupId;
}

queryResult = await scheuledJobRepository.findByJobGroupId(groupId);
