export interface INodeType {
	description: INodeTypeDescription;
	execute?(this: IExecuteFunctions): Promise<INodeExecutionData[][] | null>;
	executeSingle?(this: IExecuteSingleFunctions): Promise<INodeExecutionData>;
	trigger?(this: ITriggerFunctions): Promise<ITriggerResponse | undefined>;
}

export interface INodeTypeBaseDescription {
	node_id: string;
    journey_id: string;
    user_id: string;
    audience_id: string;
    target_node_id: string;
    displayName: string;
	name: string;
	group: string[];
	description: string;
	defaultVersion?: number;
}

export interface INodeTypeDescription extends INodeTypeBaseDescription {
	version: number | number[];
	defaults: INodeParameters;
	eventTriggerDescription?: string;
	activationMessage?: string;
	inputs: string[];
	inputNames?: string[];
	outputs: string[];
	outputNames?: string[];
	properties: INodeProperties[];
    repeatTimes?: string;
    repeatInterval?: string;
    triggerTime?: string;
    taskStatus?: string;
	triggerPanel?: {
		header?: string;
		executionsHelp?:
			| string
			| {
					active: string;
					inactive: string;
			  };
		activationHint?:
			| string
			| {
					active: string;
					inactive: string;
			  };
	};
}

export interface INodeProperties {
	displayName: string;
	name: string;
    type: NodePropertyTypes;
	default: NodeParameterValue | INodeParameters | INodeParameters[] | NodeParameterValue[];
	description?: string;
	hint?: string;
	displayOptions?: IDisplayOptions;
	options?: Array<INodePropertyOptions | INodeProperties | INodePropertyCollection>;
	placeholder?: string;
	isNodeSetting?: boolean;
	noDataExpression?: boolean;
	required?: boolean;
}

export type NodePropertyTypes =
	| 'boolean'
	| 'fixedCollection'
	| 'hidden'
	| 'json'
	| 'multiOptions'
	| 'number'
	| 'options'
	| 'string'

export interface INodePropertyOptions {
	name: string;
	value: string | number | boolean;
	action?: string;
	description?: string;
}

export interface INodePropertyCollection {
	displayName: string;
	name: string;
	values: INodeProperties[];
}

export interface IDisplayOptions {
	hide?: {
		[key: string]: NodeParameterValue[] | undefined;
	};
	show?: {
		[key: string]: NodeParameterValue[] | undefined;
	};
}

export type NodeParameterValue = string | number | boolean | undefined | null;

export interface INodeParameters {
	[key: string]: NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[];

}

export interface INode {
	id: string;
	name: string;
	typeVersion: number;
	type: string;
	position: [number, number];
	disabled?: boolean;
	notes?: string;
	notesInFlow?: boolean;
	retryOnFail?: boolean;
	maxTries?: number;
	waitBetweenTries?: number;
	alwaysOutputData?: boolean;
	executeOnce?: boolean;
	continueOnFail?: boolean;
	parameters: INodeParameters;
}

export interface IExecuteFunctions {
	continueOnFail(): boolean;
	evaluateExpression(
		expression: string,
		itemIndex: number,
	): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[];
	executeWorkflow(
		workflowInfo: IExecuteWorkflowInfo,
		inputData?: INodeExecutionData[],
	): Promise<any>;
	getInputData(inputIndex?: number, inputName?: string): INodeExecutionData[];
	getNode(): INode;
	getNodeParameter<T extends { resource: string }>(
		parameterName: 'resource',
		itemIndex?: number,
	): T['resource'];
	// getNodeParameter(parameterName: 'operation', itemIndex?: number): string;
	getNodeParameter(
		parameterName: string,
		itemIndex: number,
		fallbackValue?: any,
	): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object;
	getWorkflowStaticData(type: string): IDataObject;
	getExecuteData(): IExecuteData;
	getWorkflow(): IWorkflowMetadata;
    putExecutionToWait(waitTill: Date): Promise<void>;
	prepareOutputData(
		outputData: INodeExecutionData[],
		outputIndex?: number,
	): Promise<INodeExecutionData[][]>;
}

export type IContextObject = {
	[key: string]: any;
};

export interface IExecuteWorkflowInfo {
	code?: IWorkflowBase;
	id?: string;
}

export interface IWorkflowBase {
	id?: number | string | any;
	name: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	nodes: INode[];
	connections: IConnections;
	staticData?: IDataObject;
}


export interface IConnection {
	// The node the connection is to
	node: string;

	// The type of the input on destination node (for example "main")
	type: string;

	// The output/input-index of destination node (if node has multiple inputs/outputs of the same type)
	index: number;
}

export type NodeInputConnections = IConnection[][];

export interface IConnections {
	// Node name
	[key: string]: INodeConnections;
}

export interface INodeConnections {
	// Input name
	[key: string]: NodeInputConnections;
}

export type GenericValue = string | object | number | boolean | undefined | null;

export interface IDataObject {
	[key: string]: GenericValue | IDataObject | GenericValue[] | IDataObject[];
}

export interface INodeExecutionData {
	[key: string]:
		| IDataObject
		| number
		| undefined;
	json: IDataObject;
}

export interface IExecuteSingleFunctions {
	continueOnFail(): boolean;
	evaluateExpression(
		expression: string,
		itemIndex: number | undefined,
	): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[];
	getContext(type: string): IContextObject;
	getInputData(inputIndex?: number, inputName?: string): INodeExecutionData;
	getItemIndex(): number;
	getNode(): INode;
	getNodeParameter(
		parameterName: string,
		fallbackValue?: any,
	): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object;
	getRestApiUrl(): string;
	getTimezone(): string;
	getExecuteData(): IExecuteData;
	getWorkflow(): IWorkflowMetadata;
	getWorkflowStaticData(type: string): IDataObject;
}

export interface IWorkflowMetadata {
	id?: number | string;
	name?: string;
	active: boolean;
}

export interface IExecuteData {
	data: ITaskDataConnections;
	node: INode;
	source: ITaskDataConnectionsSource | null;
}

export interface ITaskDataConnections {
	[key: string]: Array<INodeExecutionData[] | null>;
}

export interface ITaskDataConnectionsSource {
	[key: string]: Array<ISourceData | null>;
}

export interface ISourceData {
	previousNode: string;
	previousNodeOutput?: number; // If undefined "0" gets used
	previousNodeRun?: number; // If undefined "0" gets used
}

export interface ITriggerFunctions {
	emit(
		data: INodeExecutionData[][],
	): void;
	getNode(): INode;
	getNodeParameter(
		parameterName: string,
		fallbackValue?: any,
	): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object;
	getWorkflow(): IWorkflowMetadata;
	getWorkflowStaticData(type: string): IDataObject;
}

export interface ITriggerResponse {
	closeFunction?: () => Promise<void>;
	// To manually trigger the run
	manualTriggerFunction?: () => Promise<void>;
	// Gets added automatically at manual workflow runs resolves with
	// the first emitted data
	manualTriggerResponse?: Promise<INodeExecutionData[][]>;
}
