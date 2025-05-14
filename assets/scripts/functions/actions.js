lineAction = function(self) {
					self.material.opacity -= 0.05;
					if(self.material.opacity <= 0) {self.removeFromParent(); freeList.push(self)};	
}

cubeBlurAction = function(self) {
		self.material.opacity -= 0.1;
		if(self.material.opacity <= 0) {self.removeFromParent(); self = null};		
}