export default {
  title: 'FAQ',
  main: {
    title: 'Main',
    text: `
            The minimum order is {{ firstOrder }} €<br/>
            Minimum cut length: 3 meters<br/>
            Prepayment: 100%<br/>
            Worldwide delivery<br/>
            VAT is included for French companies and individuals<br/>
        `,
  },
  reservation: {
    title: 'Reservation of Fabrics',
    text: `
            We would like to explain our rules for reserving items in your shopping cart so that you understand how it works. Here's what you need to know:
            <ul>
                <li>Each fabric that you add to your cart will be reserved for <strong>{{ time }} for you only</strong></li>
                <li>After the reservation time has passed, other users will be able to see the fabric in the catalog and add it to their own cart. However, the fabric will still remain in your cart and <strong>you can purchase it</strong> if you do it faster than other users</li>
                <li>If another user purchases the fabric that was in your cart and the reservation time has already passed, unfortunately, you will not be able to purchase it anymore</li>
            </ul>
            We hope that these rules will help you understand how our system for reserving fabrics in your shopping cart works. If you have any questions, please contact our support team.
        `,
  },
  newsletter: {
    title: 'Newsletter',
    text: `
            Subscribe to our newsletter to receive it weekly via WhatsApp and email, except during our vacation periods, of which you will be notified in advance. 
            <br/><br/>
            If you do not receive any emails for more than two weeks, please contact us. It could be that, due to technical issues related to WhatsApp, your number has been deleted from the mailing list.
        `,
  },
  same: {
    title: 'Can the same fabrics be ordered again?',
    text: `
            The stock fabrics we sell are available in limited quantities. If we no longer have the fabric you like in stock, we cannot make an additional order. However, our prices are 2 to 5 times lower than booking directly from the manufacturers.
            <br/><br/>
            There are some articles that we can order from the factory, but the cost is 2 to 5 times higher. Additionally, each manufacturer has its own minimum order requirement, which can range from 6-10 meters to 50, 100, or even 500 meters. Please keep this information in mind when purchasing a certain fabric that you may want to order again in the future.
        `,
  },
  processing: {
    title: 'Order Processing',
    text: `
            Once you receive the message "Order accepted", it means that we have seen and accepted your order. If you have not received this message, please contact us as soon as possible.
            <br/><br/>
            The next step is to complete the order and issue an invoice within 1-2 working days.
        `,
  },
  blue: {
    title: 'Blue check marks',
    text: 'Please note that messages you send us are automatically marked as read by the program we work with. The blue ticks next to a message are not always a confirmation of reading. We will answer you as soon as possible!',
  },
  invoice: {
    title: 'Invoice and Payment',
    text: `
            All prices on the website are indicated without VAT. To determine if you need to pay VAT at a rate of 20%, consider the following:
                <ul>
                    <li>If you are in France, you will always pay VAT.</li>
                    <li>If you are in the European Union (see the list of countries*), you will not pay VAT if you have a VAT number. You will pay VAT if you do not have a VAT number.</li>
                    <li>If you are outside the European Union, you will not pay VAT.</li>
                </ul>
            Please note that even if you do not pay VAT when purchasing fabrics, you may be required to pay it in your country upon receiving imported goods from the European Union. It is recommended that you check with your local customs office before placing your order.<br/><br/>
            <strong>Here is a list of member states of the European Union:</strong><br/><br/>
            Germany, Austria, Belgium, Bulgaria, Cyprus, Croatia, Denmark, Spain, Estonia, Finland, France, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Czech Republic, Romania, Slovakia, Slovenia, and Sweden.
        `,
  },
  delivery: {
    title: 'Delivery',
    text: `
            We offer worldwide shipping. To reduce costs, we roll one fabric on top of another before packing it in black export plastic. We measure the dimensions of the shipment and put them into our logistics aggregator to find the cheapest shipping method.
            <br /><br />
            We operate on Ex Works terms
            <br /><br />
            For customers in England, please pay attention to this point: goods sent from abroad
        `,
  },
  minimal: {
    title: 'Minimal Order',
    text: `The minimum amount is {{ firstOrder }} €. The minimum cut is set for each type of fabric separately, depending on the price. For example, we sell cheap fabrics from 10-15 meters, medium - from 5 meters, and expensive - from 3 meters. Purchases below the established minimum are negotiated individually.`,
  },
  cut: {
    title: 'Cut Length Deviations',
    text: `
            Here are some guidelines regarding cut length deviations:
            <ul>
                <li>The actual meterage in the invoice may differ from the ordered amount by up to 2 meters.</li>
                <li>Deviations of more than 2 meters need to be agreed upon individually.</li>
                <li>Length deviation can be up to 3% of the cut length.</li>
                <li>A cut can consist of two parts, but the smallest part must not be shorter than 3 meters.</li>
                <li>In exceptional cases, some fabrics may be missing due to deadstock features.</li>
            </ul>
        `,
  },
  defects: {
    title: 'Acceptable Defects',
    text: `
            <ul>
                <li>A defect is considered to be a visible abnormal change on the right side of the fabric, at a distance of more than 5 cm from the edges. Examples include incorrect dyeing, misprinting, tight picks, cuts, stains, drop stitches, etc.</li>
                <li>Minor, slightly visible changes are not considered defects.</li>
                <li>Acceptable defect number: 1 defect per 10 meters of fabric.</li>
                <li>Compensation and returns for each case will be agreed upon individually.</li>
            </ul>
        `,
  },
};
