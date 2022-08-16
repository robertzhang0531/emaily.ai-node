import { INodeType, INodeTypeDescription, INodeExecutionData, IExecuteFunctions } from "./node_interface";

export class stopNode implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details will go here
        node_id: "",
        journey_id: "",
        user_id: "",
        audience_id: "",
        target_node_id: "",
        displayName: "Stop Node",
        name: "stopNode",
        group: ["stop"],
        description: "No more operations",
        version: 1.0,
        inputs: [],
        outputs: [],
        // UI for the node will go here
        defaults: {
            // Defaults for the node will go here
        },
        properties: [
        ]
    }

    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		return this.prepareOutputData(items);
	}
}