class AppError {
	public readonly message: string;
	public readonly statusCode: number;
	public readonly statusMessage: string;

	constructor(message: string, statusCode = 400, statusMessage?: string) {
		this.message = message;
		this.statusCode = statusCode;
		this.statusMessage =
			statusMessage || this.getDefaultStatusMessage(statusCode);
	}

	private getDefaultStatusMessage(statusCode: number): string {
		const statusMessages: Record<number, string> = {
			// 4xx Client Errors
			400: "Bad Request",
			401: "Unauthorized",
			402: "Payment Required",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			409: "Conflict",
			410: "Gone",
			411: "Length Required",
			412: "Precondition Failed",
			413: "Payload Too Large",
			414: "URI Too Long",
			415: "Unsupported Media Type",
			416: "Range Not Satisfiable",
			417: "Expectation Failed",
			418: "I'm a teapot",
			422: "Unprocessable Entity",
			425: "Too Early",
			426: "Upgrade Required",
			428: "Precondition Required",
			429: "Too Many Requests",
			431: "Request Header Fields Too Large",
			451: "Unavailable For Legal Reasons",

			// 5xx Server Errors
			500: "Internal Server Error",
			501: "Not Implemented",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout",
			505: "HTTP Version Not Supported",
			506: "Variant Also Negotiates",
			507: "Insufficient Storage",
			508: "Loop Detected",
			510: "Not Extended",
			511: "Network Authentication Required",
		};

		return statusMessages[statusCode] || "Unknown Error";
	}
}

export default AppError;
