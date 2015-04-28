var moduleEvents = (function(){

   var $div = document.getElementById('events');
   
   $div.onclick = function(event){
        event.preventDefault();
       
        var $html = event.target;
        
        if($html.className.indexOf("toggleCNPJ") > -1){
            var $input = $html.nextElementSibling;
            $input.className = $input.className.indexOf("hide") > -1? "CNPJ"  : "CNPJ hide" ;
        }

  $div.onchange = function(event){
        var $select = event.target;
        var id = !IsEmpty($select.getAttribute('id'))? $select.getAttribute('id') : "";
        if(id.indexOf('ufs') > -1){
            var $option = $select.options[$select.selectedIndex].value;
        }

        event.preventDefault();
    }

   $div.onkeyup = function(event){
        event.preventDefault();
       
        var $input = event.target;
        
        $input.className = $input.className.replace(/alerta/,'');
        
        var attrMask = !IsEmpty($input.getAttribute('data-mask'))?$input.getAttribute('data-mask') : "";
        var attrType = !IsEmpty($input.getAttribute('data-type'))?$input.getAttribute('data-type') : "";

        var erEmail = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
        
        if(attrMask.indexOf('cep') > -1)
            $input.value = $input.value.replace(/\D/g,"").replace(/^(\d{5})(\d{3})/,"$1-$2");
        else if(attrMask.indexOf('ddd') > -1)
            $input.value = $input.value.replace(/\D/g,"").replace(/^(\d{3})/,"($1)");
        else if(attrMask.indexOf('telefone') > -1)
            $input.value = $input.value.replace(/\D/g,"").replace(/^(\d{4})(\d{5})/,"$1-$2");
        else if(attrMask.indexOf('cnpj') > -1)
            $input.value = $input.value.replace(/\D/g,"").replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,"$1.$2.$3/$4-$5");
        else if(attrMask.indexOf('email') > -1)
            !erEmail.exec($input.value.toLowerCase())? document.getElementById('EmailError').className = document.getElementById('EmailError').className.replace(/hide/,''):document.getElementById('EmailError').className = "hide"; 
        
        if(attrType.indexOf('text') > -1)
            $input.value = $input.value.replace(/\d/ig,'');
        else if(attrType.indexOf('number') > -1)
            $input.value = $input.value.replace(/\D/ig,'');


        function IsEmpty(string){
            return string == "" || string == null || string == undefined;
        }
   }
})