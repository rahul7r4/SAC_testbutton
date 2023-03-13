(function() {
    let tmpl = document.createElement('template');
    tmpl.innerHTML =
        `<button type="button" id="myBtn">Refresh</button>`;
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();
        }
        init() {
            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.fireChanged();
                this.dispatchEvent(event);
            });
        }
        fireChanged() {
            //console.log("OnClick Triggered");  
            var tokenUrl = "https://apis-sandbox.fedex.com/oauth/token";
            var header = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            var oBody = {
                "grant_type": "client_credentials",
                "client_id": "l791ad13cfd6c24011a80718326708ce9f",
                "client_secret": "dbab843af75b4e82ab74805384396f01"
            };
            $.ajax({
                url: tokenUrl,
                headers: header,
                type: 'POST',
                data: $.param(oBody),
                processData: false,
                success: function(data) {
                    var headValues = {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + data.access_token
                    };
                    var url = "https://apis-sandbox.fedex.com/rate/v1/rates/quotes";
                    var oData = {
                        "accountNumber": {
                            "value": "740561073"
                        },
                        "rateRequestControlParameters": {
                            "returnTransitTimes": true,
                            "servicesNeededOnRateFailure": true,
                            "variableOptions": "FREIGHT_GUARANTEE",
                            "rateSortOrder": "SERVICENAMETRADITIONAL"
                        },
                        "requestedShipment": {
                            "shipper": {
                                "address": {
                                    "postalCode": "35004",
                                    "countryCode": "US",
                                    "residential": false
                                }
                            },
                            "recipient": {
                                "address": {
                                    "postalCode": "60001",
                                    "countryCode": "US",
                                    "residential": false
                                }
                            },
                            "rateRequestType": [
                                "LIST",
                                "PREFERRED",
                                "INCENTIVE",
                                "ACCOUNT"
                            ],
                            "pickupType": "CONTACT_FEDEX_TO_SCHEDULE",
                            "requestedPackageLineItems": [{
                                "weight": {
                                    "units": "LB",
                                    "value": 22
                                },
                                "groupPackageCount": 10
                            }],
                            "customsClearanceDetail": {
                                "commercialInvoice": {
                                    "shipmentPurpose": "GIFT"
                                },
                                "freightOnValue": "CARRIER_RISK",
                                "dutiesPayment": {},
                                "commodities": [{
                                    "description": "DOCUMENTS",
                                    "weight": {
                                        "units": "LB",
                                        "value": 22
                                    },
                                    "quantity": 1,
                                    "customsValue": {
                                        "amount": "100",
                                        "currency": "INR"
                                    },
                                    "unitPrice": {
                                        "amount": "100",
                                        "currency": "INR"
                                    },
                                    "numberOfPieces": 1,
                                    "countryOfManufacture": "IN",
                                    "quantityUnits": "PCS"
                                }]
                            }
                        }
                    };
 
                    $.ajax({
                        url: url,
                        headers: headValues,
                        type: 'POST',
                        data: JSON.stringify(oData),
                        processData: false,
                        success: function(data) {
                            console.log("success" + data);
                        },
                        error: function(e) {
                            console.log("error: " + e);
                        }
                    });
                },
                error: function(e) {
                    console.log("error: " + e);
                }
            });
        }
    }
    customElements.define('custom-button', PerformanceHelp);
})();
