import { INodeType, INodeTypeDescription } from "./node_interface";

export class regularNode implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details will go here
        node_id: "",
        journey_id: "",
        user_id: "",
        audience_id: "",
        target_node_id: "",
        displayName: "Regular Node",
        name: "regularNode",
        group: ["regular"],
        description: "Perform certain actions",
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
                displayName: "Resource",
                name: "resource",
                type: 'options',
                default: "",
                description: "The resource to be used",
                // The operations object defines the available operations on a resource.
                options: [
                    {
                        displayName: "Operation",
                        name: "operation",
                        type: 'options',
                        default: "",
                        description: "The operation to be performed"
                    }
                ]
            }
        ]
    }
}