export const SES_SNS_EVENT_SCHEMA = {
  type: 'object',
  properties: {
    Records: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          eventVersion: { type: 'string' },
          ses: {
            type: 'object',
            properties: {
              receipt: {
                type: 'object',
                properties: {
                  timestamp: { type: 'string' },
                  processingTimeMillis: { type: 'number' },
                  recipients: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'email',
                    },
                  },
                  spamVerdict: {
                    type: 'object',
                    properties: { status: { type: 'string' } },
                  },
                  virusVerdict: {
                    type: 'object',
                    properties: { status: { type: 'string' } },
                  },
                  spfVerdict: {
                    type: 'object',
                    properties: { status: { type: 'string' } },
                  },
                  dkimVerdict: {
                    type: 'object',
                    properties: { status: { type: 'string' } },
                  },
                  dmarcVerdict: {
                    type: 'object',
                    properties: { status: { type: 'string' } },
                  },
                  dmarcPolicy: { type: 'string' },
                  action: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      topicArn: { type: 'string' },
                    },
                  },
                },
              },
              mail: {
                type: 'object',
                properties: {
                  timestamp: { type: 'string' },
                  source: { type: 'string' },
                  messageId: { type: 'string' },
                  destination: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'email',
                    },
                  },
                  headers: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        value: { type: 'string' },
                      },
                    },
                  },
                  commonHeaders: {
                    type: 'object',
                    properties: {
                      returnPath: { type: 'string' },
                      from: {
                        type: 'array',
                        items: {
                          type: 'string',
                          format: 'email',
                        },
                      },
                      date: { type: 'string' },
                      to: {
                        type: 'array',
                        items: {
                          type: 'string',
                          format: 'email',
                        },
                      },
                      messageId: { type: 'string' },
                      subject: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          eventSource: { type: 'string' },
        },
      },
    },
  },
};
