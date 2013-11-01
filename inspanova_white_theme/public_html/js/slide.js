/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var InspaSlider = new Class({
    Implements: [Options],
    options:{
        
        delay: 5000,
        effectDuration: 500,
        startMargin: 0,
        minMargin: -2000,
        maxMargin: 2000,
        second_sorce: '.footer_links',
        activeOptions : {
            'transition' : 'linear',
            'duration' : 1500
        },
        slideOptions: {   
            'transition' : 'back:in:out', 
            'duration' : 1000,
            'link': 'cancel'
        }
    },
    initialize: function(src_element, dest_element) {
        this.src_element = src_element;
        this.second_src = $$('.footer_links')[0];
        this.dest_element = dest_element;
        this.srcs = this.src_element.getElements('li');
        this.second_srcs = this.second_src.getElements('li');
        this.destinations = this.dest_element.getElements('.content_section');
        this.currentIndex = 0;
        this.nextIndex = 0;
        this.effects = new Fx.Elements(this.destinations, this.options.activeOptions);
        this.effects.addEvent('complete', function() {
            var height = this.destinations[this.nextIndex].getStyle('height');
            this.dest_element.tween('height', height);
        }.bind(this));
        this.transition();
        this.srcs.each(function(li, index){            
            li.addEvent('click', function(ev){
                this.srcs[this.currentIndex].removeClass('selected');
                this.nextIndex = index;
                this.srcs[this.nextIndex].addClass('selected');
                this.transition()
            }.bind(this));
        }.bind(this));
        this.second_srcs.each(function(li, index){            
            li.addEvent('click', function(ev){
                this.srcs[this.currentIndex].removeClass('selected');
                this.nextIndex = index;
                this.srcs[this.nextIndex].addClass('selected');
                this.transition()
            }.bind(this));
        }.bind(this));
    },
    transition: function() {
       
        var effect = {};
        effect[this.currentIndex] = {'margin-top': [this.options.startMargin, this.options.maxMargin]};
        this.destinations[this.nextIndex].tween('margin-top',0);
        
        effect[this.nextIndex] = { 'margin-left': [this.options.minMargin, this.options.startMargin]};
        //this.activeSlide.tween('left', this.changeLeft);

        this.effects.start(effect);
        
        
        this.currentIndex = this.nextIndex;
        //this.controls[this.currentIndex].removeClass('inactive').addClass('active');	
    },
});
window.addEvent('domready', function(){
    $('services_content').load('services.html');
    $('products_content').load('products.html');
    $('careers_content').load('careers.html');
    $('company_content').load('company.html');
    $('contactus_content').load('contactus.html');
    //$('home_content').load('home.html');
    if($$('.menu').length > 0) {
        var slide = new InspaSlider($$('.menu')[0], $$('.content')[0]);
    } 
});