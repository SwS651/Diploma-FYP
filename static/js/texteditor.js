

function exec(object,args=null) {
    var strid = event.target.id;
    document.execCommand(strid,false,args)
}

function createlink(){
    let url = window.prompt('Enter your link');
    if(url)
        exec(event,url);

}


function uploadImg(){
    btnUpload = document.getElementById('uploadBtn')
    btnUpload.click();

    readerInsFtImg = new FileReader();
    btnUpload.addEventListener('change', function(){
        chosenImageRt = this.files[0];

        readerInsFtImg.onload = function(e){
            url =e.target.result;
            document.execCommand('InsertImage',false,url);

        }
        readerInsFtImg.abort();
        if(chosenImageRt){
            readerInsFtImg.readAsDataURL(chosenImageRt)
        }
    })
}

/*Font size*/
$('#fontsize').change(function(){
    let num = $('#fontsize option:selected').val();
    document.execCommand("fontSize", false, "7");
    var fontElements = document.getElementsByTagName("font");
    for (var i = 0, len = fontElements.length; i < len; ++i) {
        if (fontElements[i].size == "7") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = `${num}px`;
        }
    }

})

/*Export file */
function downloadInnerHtml(filename) {
    let elHtml = document.getElementById('textareaI').innerHTML;
    let link = document.createElement('a');
    link.setAttribute('download', filename);   
    link.setAttribute('href', 'data:' + 'text/doc' + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
    
}

/*Import file*/
function openfile() {
        let btnupload = document.querySelector('#uploadfile');
        btnupload.click();
        
        btnupload.addEventListener('change',function(){
            var input = event.target;
            var reader = new FileReader();
            reader.onload = function() {
                if(reader.result) {
                    $("#textareaI").html(reader.result);
                }
            };
            reader.readAsText(input.files[0]);
    
        })
            
        
};
