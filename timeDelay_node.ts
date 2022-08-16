import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from "./node_interface";

export class timeDelayNode implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details will go here
        node_id: "",
        journey_id: "",
        user_id: "",
        audience_id: "",
        target_node_id: "",
        repeatTimes: "",
        repeatInterval: "",
        triggerTime: "",
        taskStatus: "",
        displayName: "Time Delay Node",
        name: "timeDelayNode",
        group: ["timeDelay"],
        description: "Wait for a certain time before continuing",
        version: 1.0,
        inputs: [],
        outputs: [],
        // UI for the node will go here
        defaults: {
            // Defaults for the node will go here
        },
        properties: [
            // Resources and operations will go here
            // The resource object defines the API resource that the node uses.
            {
				displayName: 'Wait Amount',
				name: 'amount',
				type: 'number',
				displayOptions: {
					show: {
						resume: [
							'timeInterval',
						],
					},
				},
				default: 1,
				description: 'The time to wait',
			},
			{
				displayName: 'Wait Unit',
				name: 'unit',
				type: 'options',
				displayOptions: {
					show: {
						resume: [
							'timeInterval',
						],
					},
				},
				options: [
					{
						name: 'Seconds',
						value: 'seconds',
					},
					{
						name: 'Minutes',
						value: 'minutes',
					},
					{
						name: 'Hours',
						value: 'hours',
					},
					{
						name: 'Days',
						value: 'days',
					},
				],
				default: 'hours',
				description: 'The time unit of the Wait Amount value',
			},
        ]
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resume = this.getNodeParameter('resume', 0) as string;

		let waitTill: Date;

		const unit = this.getNodeParameter('unit', 0) as string;

        let waitAmount = this.getNodeParameter('amount', 0) as number;
        if (unit === 'minutes') {
            waitAmount *= 60;
        }
        if (unit === 'hours') {
            waitAmount *= 60 * 60;
        }
        if (unit === 'days') {
            waitAmount *= 60 * 60 * 24;
        }

        waitAmount *= 1000;

        waitTill = new Date(new Date().getTime() + waitAmount);

		const waitValue = Math.max(waitTill.getTime() - new Date().getTime(), 0);

		await this.putExecutionToWait(waitTill);

		return [this.getInputData()];
	}
}