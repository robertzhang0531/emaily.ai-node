import { INodeType, INodeTypeDescription } from "./node_interface";

export class triggerNode implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details will go here
        node_id: "",
        journey_id: "",
        user_id: "",
        audience_id: "",
        target_node_id: "",
        displayName: "Trigger Node",
        name: "triggerNode",
        group: ["trigger"],
        description: "A trigger node",
        version: 1.0,
        inputs: [],
        outputs: [],
        // UI for the node will go here
        defaults: {
            // Defaults for the node will go here
        },
        properties: [
            // Some events to trigger action
            {
                displayName: 'Event',
                name: 'event',
                type: 'options',
                required: true,
                default: '',
                options: [
                    {
                        name: 'Subscribe To A List',
                        value: 'subscribeToList',
                    },
                    {
                        name: 'Unsubscribe From A List',
                        value: 'unsubscribeFromList',
                    },
                    {
                        name: 'Abandon Cart',
                        value: 'abandonCart',
                    },
                    {
                        name: 'Place a Purchase',
                        value: 'placePurchase',
                    },
                ],
            },
        ]
        // webhook methods will go here
    };
}