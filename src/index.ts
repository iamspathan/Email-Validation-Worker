/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */



export default {

	async fetch(request: Request, env: any, ctx: any): Promise<Response> {
		if (request.method !== 'POST') {
            return new Response('Expected POST', { status: 405 });
        }

        const formData = await request.formData();
        const file = formData.get('file');
        if (!file || !(file instanceof File)) {
            return new Response('No file uploaded', { status: 400 });
        }

        const text = await file.text();
        const emails = text.split('\n').map(email => email.trim()).filter(email => email !== '');
	
        let validEmails: string[] = [];
        let invalidEmails: string[] = [];

        // Process emails in batches of 10
        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            const result : any = await this.validateEmail(email);
            if (result.data) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
            // Wait for 1 second before processing the next email
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

		let csvContent = 'Emails,Invalid Emails\n'; emails.forEach((email, index) => {csvContent += `${email},${invalidEmails[index]}\n`;
});

        return new Response(csvContent.replaceAll('undefined', ''), {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="email_validation_result.csv"'
            }
        });

	
	},

	async validateEmail(email: string): Promise<boolean> {
        const apiResponse = await fetch('https://api.apyhub.com/validate/email/dns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apy-token': 'YOUR-SECRET-APY-TOEKN'
            },
			
			body: JSON.stringify({email})
        });
	
        if (!apiResponse.ok) {
            console.error(`API call failed with status: 400`);
            return false;
        }
        return await apiResponse.json()
    },
};
