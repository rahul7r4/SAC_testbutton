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
                    var url = "https://apis-sandbox.fedex.com/track/v1/associatedshipments";
                    var oData = {    
"includeDetailedScans": true,    
"associatedType": "STANDARD_MPS",    
"masterTrackingNumberInfo": 
{        
"shipDateEnd": "2023-03-22",        
"shipDateBegin": "2023-03-20",        
"trackingNumberInfo": {            
"trackingNumberUniqueId": "245822~123456789012~FDEG",            
"carrierCode": "FDXE",            
"trackingNumber": "858488600850"        
}    },    
"pagingDetails": 
{        
"resultsPerPage": 56,        
"pagingToken": "38903279038"    
}}
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
